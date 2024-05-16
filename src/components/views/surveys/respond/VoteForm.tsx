import { Form } from "@/components/ui/form/Form";
import { useCallback, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { Button } from "@/components/ui/Button";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useLocation } from "wouter";
import { getApiClient } from "@/lib/api_client";

interface Props {
	survey: any;
}

const api = getApiClient();

export function VoteForm({ survey }: Props) {
  const [, setLocation] = useLocation();
	const [surveyOptions, setSurveyOptions] = useState<any[] | null>(null);

	const fetchSurveyOptions = useCallback(async (surveyId: number) => {
    const optionsResp = await api.get(`/surveys/${surveyId}/options`);
    setSurveyOptions(optionsResp as any[]);
  }, []);

	useEffect(() => {
		if (survey?.id && !surveyOptions) {
			try {
				fetchSurveyOptions(survey.id);
			} catch (err) {
				console.error(err);
			}
		}
	}, [survey, surveyOptions, fetchSurveyOptions]);

	if (!survey) { return null; }

  const handleDragEnd = (result: DropResult) => {
    if (!surveyOptions || !result.destination) { return; }
    const newOptions = [...surveyOptions];
    newOptions.splice(result.source.index, 1);
    newOptions.splice(result.destination.index, 0, surveyOptions[result.source.index]);
    setSurveyOptions(newOptions);
  };

	const handleMoveOptionUp = (optionsIndex: number) => {
    if (!surveyOptions || optionsIndex == 0) { return; }
    const newOptions = [...surveyOptions];
    newOptions[optionsIndex - 1] = surveyOptions[optionsIndex];
    newOptions[optionsIndex] = surveyOptions[optionsIndex - 1];
    setSurveyOptions(newOptions);
  };

  const handleMoveOptionDown = (optionsIndex: number) => {
    if (!surveyOptions || optionsIndex == surveyOptions.length - 1) { return; }
    const newOptions = [...surveyOptions];
    newOptions[optionsIndex + 1] = surveyOptions[optionsIndex];
    newOptions[optionsIndex] = surveyOptions[optionsIndex + 1];
    setSurveyOptions(newOptions);
  };

  const handleSubmit = async () => {
    await api.post(`/surveys/${survey.id}/vote`, {
      options: surveyOptions?.map((o: any) => o.id),
    });
    setLocation(`/surveys/${survey.id}/thanks`);
  };

	return (
		<Form onSubmit={handleSubmit}>
      <p className="mb-4">
        Rank the following items by dragging and dropping or using the buttons.
      </p>
      <p className="mb-4">
        The first item is your most preferred and the last is your least.
      </p>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="placeholder">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {surveyOptions?.map((option: any, index: number) => (
                <VoteOption
                  key={option.id}
                  option={option}
                  index={index}
                  onOptionDown={() => handleMoveOptionDown(index)}
                  onOptionUp={() => handleMoveOptionUp(index)}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
		</Form>
	);
}

interface VoteOptionProps {
  option: any;
  index: number;
  onOptionUp: () => void;
  onOptionDown: () => void;
}

function VoteOption({ option, index, onOptionUp, onOptionDown }: VoteOptionProps) {
  return (
    <Draggable draggableId={option.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-gray-100 my-1 flex items-center h-10 pl-2 border-gray-200 border-2 drop-shadow-sm"
        >
          <div className="flex-grow">
            {option?.title}
          </div>
          <Button onClick={onOptionDown} variant="outline">
            <FiChevronDown />
          </Button>
          <Button onClick={onOptionUp} variant="outline">
            <FiChevronUp />
          </Button>
        </div>
      )}
    </Draggable>
  );
}

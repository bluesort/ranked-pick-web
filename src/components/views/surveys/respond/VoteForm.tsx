import { Form } from "@/components/ui/Form";
import { useCallback, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { Button } from "@/components/ui/Button";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useLocation } from "wouter";
import { getApiClient } from "@/lib/api-client";
import { Separator } from "@/components/ui/Separator";

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
    setLocation(`/thanks`);
  };

	return (
		<Form onSubmit={handleSubmit} submitLabel="Vote" footerSeparator={false}>
      <div className="flex justify-center">
        <p className="mb-4 text-sm text-muted-foreground">
          Rank the following by dragging or using the buttons
        </p>
      </div>
      <div className="flex w-full items-center">
        <Separator className="shrink" decorative />
        <div className="mx-4">Best</div>
        <Separator className="shrink" decorative />
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="placeholder">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="transition-all">
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
      <div className="flex w-full items-center">
        <Separator className="shrink" decorative />
        <div className="mx-4">Worst</div>
        <Separator className="shrink" decorative />
      </div>
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
          className="bg-gray-100 my-2 flex items-center h-10 pl-3 py-6 drop-shadow-sm"
        >
          <div className="flex-grow">
            {option?.title}
          </div>
          <Button onClick={onOptionDown} variant="outline" className="h-12">
            <FiChevronDown />
          </Button>
          <Button onClick={onOptionUp} variant="outline" className="h-12">
            <FiChevronUp />
          </Button>
        </div>
      )}
    </Draggable>
  );
}

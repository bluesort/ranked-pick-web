import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FiPlus, FiTrash2 } from "react-icons/fi";

type ManageOptionsProps = {
  options: string[];
  onUpdateOptions: (options: string[]) => void;
};

export function ManageOptions({ options, onUpdateOptions }: ManageOptionsProps) {
  const onNewOption = () => {
		const newOptions = [...options];
		newOptions.push('');
		onUpdateOptions(newOptions);
  };

  const onDeleteOption = (index: number) => {
		const newOptions = [...options];
    newOptions.splice(index, 1);
		onUpdateOptions(newOptions);
  };

  const onOptionChange = (index: number, value: string) => {
		const newOptions = [...options];
		newOptions[index] = value;
    onUpdateOptions(newOptions);
  };

  return (
    <div id="options">
      {options.map((option, index) => (
        <div key={index} className="flex mb-2">
          <Input
            type="text"
            value={option}
            placeholder="Name the survey options"
            onChange={e => onOptionChange(index, e.target.value)}
            className="mr-1"
          />
          <Button onClick={() => onDeleteOption(index)} variant="outline" aria-label="delete option">
            <FiTrash2 size="18" />
          </Button>
        </div>
      ))}
			<Button onClick={onNewOption} variant="secondary" className="flex items-center w-full" aria-label="add option">
        <FiPlus size={18} className="mr-1 mt-0.5" />
        Add option
      </Button>
    </div>
  );
}

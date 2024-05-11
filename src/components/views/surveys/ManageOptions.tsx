import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

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
		const newOptions = [...options].splice(index, 1);
		onUpdateOptions(newOptions);
  };

  const onOptionChange = (index: number, value: string) => {
		const newOptions = [...options];
		newOptions[index] = value;
    onUpdateOptions(newOptions);
  };

  return (
    <div>
      <div>
        {options.map((option, index) => (
          <div key={index} className="flex mb-1">
            <Input
              type="text"
              value={option}
              onChange={e => onOptionChange(index, e.target.value)}
            />
            <Button onClick={() => onDeleteOption(index)}>Delete</Button>
          </div>
        ))}
      </div>
			<Button onClick={onNewOption}>Add Option</Button>
    </div>
  );
}

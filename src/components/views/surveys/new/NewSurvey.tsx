import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useState } from "react";

function NewSurvey() {
  const [name, setName] = useState("");
  // const [options, setOptions] = useState([]);

  const handleSubmit = e => {
    console.log('submit');
    // e.preventDefault();
    // fetch("/api/surveys", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ name, options }),
    // })
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
  };

  // const handleOptionAdd = e => {
  //   e.preventDefault();
  //   setOptions([...options, ""]);
  // };

  // const handleOptionChange = (i, e) => {
  //   const optionsCopy = [...options];
  //   optionsCopy[i] = e.target.value;
  //   setOptions(optionsCopy);
  // };

  return (
    <div>
      <h1 className="mb-2">New Survey</h1>

      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        type="text"
        placeholder="My Survey"
        value={name}
        onChange={e => setName(e.target.value)}
      />


      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}

export default NewSurvey;

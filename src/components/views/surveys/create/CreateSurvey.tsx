import { Page } from "@/components/Page";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/TextArea";
import { Form } from "@/components/ui/Form";
import { ManageOptions } from "@/components/views/surveys/create/ManageOptions";
import { getApiClient } from "@/lib/api-client";
import { useState } from "react";
import { useLocation } from "wouter";

const api = getApiClient();

export function CreateSurvey() {
  const [, setLocation] = useLocation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState<string[]>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const resp = await api.post('/surveys', {
      title: title,
      description: description,
      options: options,
    });
    setLocation(`/${resp.id}`);
  };

  return (
    <Page title="Create Survey">
      <Form onSubmit={handleSubmit} className="[&>*]:mb-4">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="Enter a title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          placeholder="Describe the survey"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="resize-none"
        />

        <Label htmlFor="options">Options</Label>
        <ManageOptions options={options} onUpdateOptions={setOptions} />
      </Form>
    </Page>
  );
}

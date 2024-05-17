import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Spinner } from "@/components/ui/Spinner";
import { Textarea } from "@/components/ui/TextArea";
import { Form } from "@/components/ui/form/Form";
import { ManageOptions } from "@/components/views/surveys/create/ManageOptions";
import { getApiClient } from "@/lib/api-client";
import { useState } from "react";
import { useLocation } from "wouter";

const api = getApiClient();

export function CreateSurvey() {
  const [, setLocation] = useLocation();
  const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState<string[]>([]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await api.post('/surveys', {
        title: title,
        description: description,
        options: options,
      });
      setLocation(`/surveys/${resp.id}/respond`);
    } catch (err) {
			if (typeof(err) === 'string') {
				setError(err);
			} else {
        console.error(err);
				setError('Something went wrong');
			}
		} finally {
			setLoading(false);
		}
  };

  return (
    <Page title="New Survey">
      <Form onSubmit={onSubmit}>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="My Survey"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="resize-none"
        />

        <Label htmlFor="options" className="mb-1">Options</Label>
        <ManageOptions options={options} onUpdateOptions={setOptions} />
      </Form>
    </Page>
  );
}

import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Spinner } from "@/components/ui/Spinner";
import { Textarea } from "@/components/ui/TextArea";
import { ManageOptions } from "@/components/views/surveys/ManageOptions";
import { getApiClient } from "@/lib/api_client";
import { useState } from "react";
import { useLocation } from "wouter";

const api = getApiClient();

export function NewSurvey() {
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
      <form onSubmit={onSubmit} className="[&>*]:mb-4">
        {error && <p className="text-red-800 mb-4 first-letter:uppercase">{error}</p>}

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

        <div className="flex justify-end mt-4">
          <Button type="submit" className="w-20">
            {loading ? <Spinner /> : "Create"}
          </Button>
        </div>
      </form>
    </Page>
  );
}

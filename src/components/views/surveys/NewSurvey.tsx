import { useApi } from "@/components/ApiContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Spinner } from "@/components/ui/Spinner";
import { Textarea } from "@/components/ui/TextArea";
import { useState } from "react";
import { useLocation } from "wouter";

export function NewSurvey() {
  const { apiPost } = useApi();
  const [, setLocation] = useLocation();
  const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await apiPost('/surveys', {
        title: title,
        description: description,
      });
      setLocation(`/surveys/${resp.ID}`);
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

  // TODO: Page component for root of route views
  return (
    <div className="min-w-80">
      <h1 className="mb-2">New Survey</h1>

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

        <div className="flex justify-end mt-4">
          <Button type="submit" className="w-20">
              {loading ? <Spinner /> : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}

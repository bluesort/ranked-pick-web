import { Page } from "@/components/Page";
import { Link } from "wouter";

export function ResponseThanks() {
	// TODO: Re-route if user hasn't voted
	return (
		<Page center>
			<h2 className="mb-8">Thanks for voting!</h2>
			<Link to="/" className="mb-2">View survey</Link>
			<Link to="/respond">Change my response</Link>
		</Page>
	);
}

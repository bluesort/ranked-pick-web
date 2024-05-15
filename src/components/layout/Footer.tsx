function Footer() {
	return (
		<footer className="flex justify-center bg-muted text-muted-foreground h-12 p-4 text-xs [&>*]:mx-2">
			<a href="https://github.com/carterjackson/ranked-pick-api" target="_blank">API Source</a>
			<a href="https://github.com/carterjackson/ranked-pick-web" target="_blank">Client Source</a>
			<a href="/tos" target="_blank">Terms of Service</a>
		</footer>
	);
}

export default Footer;

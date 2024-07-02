const ExternalLinks = ({ path, children }) => {
    return (
        <a href={path} target="_blank" rel="external" className="bg-main p-3 rounded-full">{children}</a>
    );
}

export default ExternalLinks;
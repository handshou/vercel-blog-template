import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const MyComponent = (props) => {
    const { data } = useTina(props);

    const { title, pubDate: unPubDate, updatedDate } = data.projects;

    const pubDate =	new Date(unPubDate).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })

    return (
        <>
            <h1 className="title">{title}</h1>
            {pubDate && <time dateTime="MMM-DD-YYYY">{pubDate}</time>}
            {
            updatedDate && (
                    <div>
                    Last updated on <time>{updatedDate}</time>
                    </div>
                    )
            }
            <hr />
            <TinaMarkdown content={data.projects.body} />
        </>
    );
};

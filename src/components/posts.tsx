import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { PostsQuery } from "../../tina/__generated__/types";

export const MyComponent = (props: {
    data: PostsQuery,
    variables: {
        relativePath: string
    },
    query: string,
}) => {
    const { data } = useTina(props);

    const { title, pubDate: unPubDate, updatedDate } = data.posts;

    const pubDate = new Date(unPubDate).toLocaleDateString('en-us', {
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
            <TinaMarkdown content={data.posts.body} />
        </>
    );
};

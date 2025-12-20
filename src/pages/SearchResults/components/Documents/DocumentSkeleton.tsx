import "./DocumentSkeleton.scss";

export default function DocumentSkeleton() {
  return (
    <article className="document-skeleton">
      <div className="skeleton skeleton--meta" />
      <div className="skeleton skeleton--title" />
      <div className="skeleton skeleton--badge" />
      <div className="skeleton skeleton--text" />
      <div className="skeleton skeleton--footer" />
    </article>
  );
}

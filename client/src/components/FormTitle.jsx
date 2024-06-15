function FormTitle({ title, description }) {
  return (
    <div className="title mb-2">
      <h2 className="mb-1 fw-500 c-091e42" dangerouslySetInnerHTML={{ __html: title }}></h2>
      {description && <p className="fs-6 c-5d6b82">{description}</p>}
    </div>
  );
}

export default FormTitle;

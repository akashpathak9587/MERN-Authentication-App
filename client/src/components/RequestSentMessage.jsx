function RequestSentMessage({email}) {
  return (
    <div className="title mb-2">
      <h2 className="mb-1 fw-500 c-091e42">Request Sent Successfully</h2>
      <p className="fs-6 fw-300 c-5d6b82">
        A Reset password link sent to this <br />
        mail Id <a href="0">{email}</a> if account exists.
      </p>
    </div>
  );
}

export default RequestSentMessage;

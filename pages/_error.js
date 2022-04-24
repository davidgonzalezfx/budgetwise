const Error = ({ statusCode }) => {
  if (typeof window !== 'undefined') {
    localStorage.clear()
    window.location.href = '/'
  }

  return (
    <p style={{ color: 'var(--white)', textAlign: 'center' }}>
      {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
    </p>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res?.statusCode : err ? err?.statusCode : 404
  return { statusCode }
}

export default Error

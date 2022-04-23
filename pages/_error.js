const Error = ({ statusCode, res, err }) => {
  if (typeof window !== 'undefined') {
    localStorage.clear()
    window.location.href = '/'
  }

  return (
    <p style={{ color: 'var(--white)', textAlign: 'center' }}>
      {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
      {JSON.stringify(res)}
      {JSON.stringify(err)}
    </p>
  )
}

Error.getInitialProps = ({ res, err }) => {
  console.log('\n res :', res, '\n')
  console.log('\n err :', err, '\n')
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode, res, err }
}

export default Error

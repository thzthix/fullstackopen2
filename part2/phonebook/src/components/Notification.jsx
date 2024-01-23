const Notification = ({ isError, message }) => {
  const notifiStyle = {
    color: "green",
    backgroundColor: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  if (isError) {
    notifiStyle.color = "red"
  }
  if (message === null) {
    return null
  }

  return <div style={notifiStyle}>{message}</div>
}
export default Notification

const newMessage = (messageID, user, content) => ({
  event: 'newMessage',
  data: content,
  messageID,
  user: user,
});

const deleteMessage = (messageID, user, content) => ({
  event: 'deleteMessage',
  data: content,
  messageID,
  user: user,
});

const editMessage = (messageID, user, content) => ({
  event: 'editMessage',
  data: content,
  user: user,
});

export default { newMessage, deleteMessage, editMessage };

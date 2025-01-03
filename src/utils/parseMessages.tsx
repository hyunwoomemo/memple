import moment from 'moment';

export const parseMessages = messages => {
  const formatData = messages.reverse().map(item => ({
    ...item,
    formattedDate: moment(item.created_at).format('YY-MM-DD HH:mm'),
  }));
  // showName, showTime
  const parseData = formatData.map((item, index, arr) => {
    const prev = arr[index - 1];
    const next = arr[index + 1];

    // const isSameUser = prev?.player_id === item.player_id;
    // const isSameTime =
    //   moment(prev?.created_at).format('YYYY-MM-DD HH:mm') ===
    //   moment(item.created_at).format('YYYY-MM-DD HH:mm');

    const isSameUser = (a, b) => a?.player_id === b?.player_id;
    const isSameTime = (a, b) =>
      moment(a?.created_at).format('YYYY-MM-DD HH:mm') ===
      moment(b?.created_at).format('YYYY-MM-DD HH:mm');

    return {
      ...item,
      showName: !(isSameUser(prev, item) && isSameTime(prev, item)),
      showTime: !(isSameUser(next, item) && isSameTime(next, item)),
    };
  });

  return parseData.reverse();
};

export function calculateWinner(squares) {
  // 같은 도형이 연속으로 이어지는 경우들의 배열
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // squares[a]가 null이 아니고 세 도형이 연속으로 같다면
    if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      // 승자 반환
      return squares[a];
    }
  }
  return null;
}

export function checkDraw(squares) {
  const isFull = (element) => element !== null;
  return squares.every(isFull);
}
//줄거리 길이 조절
export default function limitTextLength(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

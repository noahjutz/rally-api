export default function mapIds(array) {
  array.forEach((e) => {
    e._id = e._id.toString();
  });
  return array;
}

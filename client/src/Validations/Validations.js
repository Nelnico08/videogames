const urlRegex =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

export default function validation(input) {
  let errors = {};
  if (input.name === '') {
    errors.name = 'Name is required';
  } else if (!/^[a-zA-Z]+$/.test(input.name.charAt(0))) {
    errors.name = 'Name must start with a letter';
  }
  if (!input.released) {
    errors.released = 'A date of videogame released is required';
  }
  if (!input.genres.length) {
    errors.genres = 'At least one genre must be selected';
  }
  if (!input.image) {
    errors.image = 'Image is required';
  } else if (!urlRegex.test(input.image)) {
    errors.image = 'invalid url';
  }
  if (!input.platforms.length) {
    errors.platforms = 'At least one platform must be selected';
  }
  if (!input.description) {
    errors.description = 'A description of videogame is required';
  } else if (input.description.length < 30) {
    errors.description = 'At least 30 characteres are required';
  }

  return errors;
}

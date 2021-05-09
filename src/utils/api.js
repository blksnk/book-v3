import axios from 'axios';

export async function fetch(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.VUE_APP_API_URL + url)
      .then((res) => {
        return resolve(res.data);
      })
      .catch((e) => {
        console.error(e);
        reject(e);
      });
  });
}

export const getTypes = (projects) =>
  projects.reduce(
    (acc, { type }) =>
      !acc.some((el) => el.type === type)
        ? [...acc, { type, projects: [] }]
        : acc,
    [],
  );

export function splitByType(projects) {
  const split = getTypes(projects);
  const types = split.map((el) => el.type);
  projects.forEach((proj) => {
    split[types.indexOf(proj.type)].projects.push(proj);
  });
  return split;
}

export const formatMediaUrl = (media) => ({
  original: process.env.VUE_APP_API_URL + media.url,
  large: process.env.VUE_APP_API_URL + media.formats.large.url,
  medium: process.env.VUE_APP_API_URL + media.formats.medium.url,
  small: process.env.VUE_APP_API_URL + media.formats.small.url,
  thumbnail: process.env.VUE_APP_API_URL + media.formats.thumbnail.url,
});

export const formatProject = (proj) => {
  return {
    ...proj,
    thumbnail: formatMediaUrl(proj.thumbnail),
    media: proj.media.map((media) => formatMediaUrl(media)),
  };
};

export const formatCategories = (categories) =>
  categories.map((cat) => ({
    ...cat,
    // type: formatType(cat.type),
    projects: sortProjects(cat.projects),
    thumbnail: cat.projects.find((proj) => proj.categoryThumbnail === true)
      .thumbnail,
  }));

export const sortProjects = (projects) =>
  projects.sort((a, b) =>
    a.categoryThumbnail === b.categoryThumbnail
      ? 0
      : a.categoryThumbnail
      ? -1
      : 1,
  );

export const getProjects = async () => {
  const projects = await fetch('/projects');
  console.log(projects);
  return formatCategories(
    splitByType(projects.map((proj) => formatProject(proj))),
  );
};

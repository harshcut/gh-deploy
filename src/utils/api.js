const BASE_URL = "https://api.github.com/repos";

export const getDeploymentData = async (name, repo) => {
  const response = await fetch(`${BASE_URL}/${name}/${repo}/deployments`, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });
  return {
    response: await response.json(),
    status: response.status,
  };
};

export const setDeploymentInactive = async ({ name, repo, deploy }, token) => {
  const response = await fetch(
    `${BASE_URL}/${name}/${repo}/deployments/${deploy}/statuses`,
    {
      method: "POST",
      body: JSON.stringify({ state: "inactive" }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.ant-man-preview+json",
        authorization: `token ${token}`,
      },
    }
  );
  return {
    response: await response.json(),
    status: response.status,
  };
};

export const deleteDeployment = async ({ name, repo, deploy }, token) => {
  const response = await fetch(
    `${BASE_URL}/${name}/${repo}/deployments/${deploy}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/vnd.github.v3+json",
        authorization: `token ${token}`,
      },
    }
  );
  return {
    response: response,
    status: response.status,
  };
};

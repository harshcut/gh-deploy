# Getting Started

GitHub Deployments is an **_unofficial_** client for managing GitHub deployment environments. It uses official [GitHub API](https://docs.github.com/en/rest) and uses the same components and design guidelines of that of GitHub's design system with [Primer](https://primer.style/).

## Deployments

Enter your username and repository to view your current deployments. Make sure your **repository is made public**, as github doesn't let you share details of your private repositories.

More information on repository visibility can be found [here](https://docs.github.com/en/github/administering-a-repository/setting-repository-visibility").

## Personal Access Token

Personal access tokens (PATs) are an alternative to using passwords for authentication to GitHub when using the GitHub API or the command line.

> As a security precaution, GitHub automatically removes personal access tokens that haven't been used in a year.

To create your personal access token head to github account **Settings** and then **Developer Settings**. In the left sidebar, click **Personal Access Tokens**. Click on **Generate New Token**, and give your token a descriptive name. From the checkboxes below, select the one with `repo_deployment`. Click **Generate Token**.

Copy the token to your clipboard and keep it safe. You will not be able to see the token again, after you navigate off the page.

## Data Updates

GitHub takes time to change the API response for the deleted deployment. Hence, the **results may be delayed** and may produce conflict. Make sure to reload the data or refresh the page.

This may be improved in the future updates.

## Developing

Fork the repository using [this](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) guide, then clone it locally.

```shell
git clone https://github.com/harshcut/gh-deploy
cd gh-deploy
yarn install
```

You can now run the client on your `localhost`.

```shell
yarn dev
```

## License

This project is licensed under the [Apache-2.0](https://github.com/harshcut/gh-deploy/blob/main/LICENSE).

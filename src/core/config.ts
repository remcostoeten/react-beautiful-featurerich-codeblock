export type TAppConfig = {
  applicationName: string;
  author: string;
  repositoryLink: string;
  githubProfile: string;
  version: string;
  githubHandle: string;
  website: string;
};

export const appConfig: TAppConfig = {
  applicationName: "CodeBlock",
  author: "Remco Stoeten",
  repositoryLink: "https://github.com/remcostoeten/beautifull-code-block",
  githubProfile: "https://github.com/remcostoeten",
  version: "beta",
  githubHandle: "remcostoeten",
  website: "https://code-block.remcostoeten.com",
} as const;

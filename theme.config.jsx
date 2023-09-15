import { useConfig } from "nextra-theme-docs";

function checkUndefined(value, valueExtraText, defaultValue) {
  if (value === undefined) {
    return defaultValue;
  }
  return value + valueExtraText;
}

const documentationSiteTitle = "Elalytics Dev Docs";

const theme = {
  logo: <span>{documentationSiteTitle}</span>,
  darkMode: false,
  nextThemes: {
    defaultTheme: "light",
  },
  docsRepositoryBase:
    "https://github.com/ddeepak95/elalytics/tree/master/src/pages/docs",
  head: function Head() {
    const config = useConfig();

    let title = checkUndefined(
      config.title,
      " | " + documentationSiteTitle,
      documentationSiteTitle
    );
    let description = "Developer Documentation for Elalytics";
    return (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </>
    );
  },
  project: {
    link: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z"
        />
      </svg>
    ),
  },
  logo: (
    <>
      <span>{documentationSiteTitle}</span>
    </>
  ),
  logoLink: false,
  sidebar: {
    defaultMenuCollapseLevel: 4,
    titleComponent({ title, type }) {
      if (title === "docs") {
        return "Documentation";
      }
      return <>{title}</>;
    },
  },
  editLink: "",
  feedback: "",

  // ... other theme options
};

export default theme;

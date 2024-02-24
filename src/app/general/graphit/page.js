import CreateGraphIt from "./components/CreateGraphIt";

const Page = () => {
  return (
    <div className="flex flex-col p-4 gap-3">
      <div className="max-w-2xl m-auto">
        <h1 className="text-3xl text-center mb-2">GraphIt!</h1>
        <p>
          GraphIt is a DIY graph builder that allows the user to drag and create
          their own graphs. GraphIt has two roles - admin and user. Admin has
          more control in GraphIt such as setting up the chart name and defining
          the axes labels and values. The user can only modify the data points
          in the chart area by dragging the points up or down.
        </p>
      </div>
      <div className="m-auto">
        <CreateGraphIt />
      </div>
    </div>
  );
};

export default Page;

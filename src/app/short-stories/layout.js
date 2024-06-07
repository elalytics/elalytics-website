import VisualizationContainerFrame from "../utils/components/VisualizationContainerFrame";
export default function RootLayout({ children }) {
  return (
    <div>
      <VisualizationContainerFrame>{children}</VisualizationContainerFrame>
    </div>
  );
}

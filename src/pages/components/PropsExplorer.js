export default function PropsExplorer({ props }) {
  return (
    <table className="">
      <thead>
        <tr className="text-left">
          <th className="p-1 border-solid border-1 border-gray-200 border font-medium">
            Name
          </th>
          <th className="p-1 border-solid border-1 border-gray-200 border  font-medium">
            Type
          </th>
          <th className="p-1 border-solid border-1 border-gray-200 border  font-medium">
            Required
          </th>
          <th className="p-1 border-solid border-1 border-gray-200 border  font-medium">
            Default
          </th>
          <th className="p-1 border-solid border-1 border-gray-200 border  font-medium">
            Value
          </th>
          <th className="p-1 border-solid border-1 border-gray-200 border  font-medium">
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        {props.map((prop) => (
          <tr key={prop.propName} className="">
            <td className="p-1 border-solid border-1 border-gray-200 border font-mono">
              <span className="p-1 rounded bg-yellow-100 border-solid border-2 border-yellow-200">
                {prop.propName}
              </span>
            </td>
            <td className="p-1 border-solid border-1 border-gray-200 border">
              {prop.propType}
            </td>
            <td className="p-1 border-solid border-1 border-gray-200 border">
              {prop.required ? "true" : "false"}
            </td>
            <td className="p-1 border-solid border-1 border-gray-200 border font-mono">
              {prop.defaultValue}
            </td>
            <td className="p-1 border-solid border-1 border-gray-200 border font-mono">
              {prop.acceptedValues.map((value, key) => (
                <span
                  key={key}
                  className="bg-gray-100 rounded p-1 mx-1 border-solid border-2 border-gray-200"
                >
                  {value}
                </span>
              ))}
            </td>
            <td className="p-1 border-solid border-1 border-gray-200 border">
              {prop.description}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

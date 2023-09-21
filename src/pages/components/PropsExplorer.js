export default function PropsExplorer({ props }) {
  if (!props) {
    return null;
  }

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
        {props.map((prop, key) => {
          console.log(prop);
          let propName = prop.propName;
          let propType = prop.propType;
          let required = prop.required || false;
          let defaultValue = prop.defaultValue || "";
          let acceptedValues = prop.acceptedValues || [];
          let description = prop.description || "";
          console.log(propName);
          return (
            <tr key={key} className=" w-full">
              <td className="p-1 border-solid border-1 border-gray-200 border font-mono">
                <span className="p-1 rounded bg-yellow-100 border-solid border-2 border-yellow-200">
                  {propName}
                </span>
              </td>
              <td className="p-1 border-solid border-1 border-gray-200 border">
                {propType}
              </td>
              <td className="p-1 border-solid border-1 border-gray-200 border">
                {required ? (
                  <span className="font-medium text-green-800">true</span>
                ) : (
                  "false"
                )}
              </td>
              <td className="p-1 border-solid border-1 border-gray-200 border font-mono">
                {defaultValue}
              </td>
              <td className="p-1 border-solid border-1 border-gray-200 border font-mono w-1/5">
                <div className="flex flex-row flex-wrap">
                  {acceptedValues.map((value, key) => (
                    <div key={key}>
                      {/* If value starts with 'any' do not add background to the any part alone */}
                      {value.startsWith("any") ? (
                        <span>
                          <span>any</span>
                          <span className="bg-gray-100 rounded p-1 mx-1 border-solid border-2 border-gray-200">
                            {value.replace("any ", "")}
                          </span>
                        </span>
                      ) : (
                        <span className="bg-gray-100 rounded p-1 mx-1 border-solid border-2 border-gray-200">
                          {value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </td>
              <td className="p-1 border-solid border-1 border-gray-200 border">
                {description}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

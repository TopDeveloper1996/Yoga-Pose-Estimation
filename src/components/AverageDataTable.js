const AverageDataTable = ({ data = [] }) => {
  return data?.length > 0 ? (
    <table className="table-fixed text-center font-medium text-primary">
      <thead className="rounded">
        <tr>
          <th className="border text-gray-800 w-10" rowSpan={2}>
            #
          </th>
          <th className="border text-start pl-3  text-gray-800" rowSpan={2}>
            Name
          </th>

          <th className="border  text-gray-800 w-1/12" colSpan={3}>
            My
          </th>

          <th className="border  text-gray-800 w-1/12" colSpan={3}>
            Top
          </th>

          <th className="border  text-gray-800 w-1/12" colSpan={3}>
            Total Avg
          </th>
        </tr>
        <tr>
          <th className="border  text-gray-800 w-1/12">Days</th>
          <th className="border  text-gray-800 w-1/12">Count</th>
          <th className="border  text-gray-800 w-1/12">Time</th>

          <th className="border  text-gray-800 w-1/12">Days</th>
          <th className="border  text-gray-800 w-1/12">Count</th>
          <th className="border  text-gray-800 w-1/12">Time</th>

          <th className="border  text-gray-800 w-1/12">Days</th>
          <th className="border  text-gray-800 w-1/12">Count</th>
          <th className="border  text-gray-800 w-1/12">Time</th>
        </tr>
      </thead>
      <tbody className="rounded">
        {data?.map((item, index) => (
          <tr>
            <td className="border">{index + 1}</td>
            <td className="border text-start pl-3">{item.name} </td>
            {/*  */}
            <td className="border">{item?.my?.days || 0}</td>
            <td className="border">{item?.my?.count || 0}</td>
            <td className="border">{item?.my?.time || 0}</td>
            {/*  */}
            <td className="border">{item?.my?.days || 0}</td>
            <td className="border">{item?.my?.count || 0}</td>
            <td className="border">{item?.my?.time || 0}</td>
            {/*  */}
            <td className="border">{item?.my?.days || 0}</td>
            <td className="border">{item?.my?.count || 0}</td>
            <td className="border">{item?.my?.time || 0}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className="flex h-full w-full items-center justify-center">
      <span className="text-primary">NO DATA</span>
    </div>
  );
};

export default AverageDataTable;

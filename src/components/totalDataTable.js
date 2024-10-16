import utils from "../utils/utils";

const TotalDataTable = ({ data = [] }) => {
  return data?.length > 0 ? (
    <table className="table-fixed w-full text-center text-primary font-medium overflow-auto">
      <thead className="rounded">
        <tr>
          <th className="border text-gray-800 w-10">#</th>
          <th className="border text-start pl-3  text-gray-800">Name</th>
          <th className="border  text-gray-800 w-1/12">
            Total Count({data?.count || 0})
          </th>
          <th className="border  text-gray-800 w-1/12">
            Total Time - ({utils.totalTime(data)})
          </th>
        </tr>
      </thead>
      <tbody className="rounded">
        {data?.map((item, index) => (
          <tr>
            <td className="border">{index + 1}</td>
            <td className="border text-start pl-3">kapotasana (P1)</td>
            <td className="border">{item?.count || 0}</td>
            <td className="border">{item?.item || "00:00"}</td>
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

export default TotalDataTable;

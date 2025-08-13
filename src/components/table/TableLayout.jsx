/* eslint-disable react/prop-types */
import TableFooter from "./pagination/TableFooter";

export default function TableLayout({ data, children }) {
  const { page, setPage, totalCount, limit } = data || {};

  return (
    <div>
      {children}
      <TableFooter data={{ page, setPage, totalCount, limit }} />
    </div>
  );
}

import { useEffect, useState } from "react";
import { useCourse, Course } from "../../utils/dao/useCourse";
import { useRouter } from "next/router";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export const CourseList = () => {
  const { getCourses } = useCourse();
  const router = useRouter();
  const [courseList, setCourseList] = useState<Course[]>();
  const classes = useStyles();

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await getCourses();
      setCourseList(result);
    };
    fetchCourses();
  }, []);

  if (courseList && courseList.length > 0) {
    return (
      <TableContainer style={{ width: "80%" }} component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Featured</StyledTableCell>
              <StyledTableCell align="center" width={400}>
                Options
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courseList.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.featured ? "Yes" : "No"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    aria-label="Edit"
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      router.push(
                        {
                          pathname: "/admin",
                          query: { s: "c", o: "e", id: row.id },
                        },
                        undefined,
                        { shallow: true }
                      );
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    onClick={() => console.log("deleted")}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return <div>Loading ...</div>;
  }
};

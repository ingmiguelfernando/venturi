import { useRouter } from "next/router";
import Dialog from "@mui/material/Dialog";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context";
import withStyles from "@mui/styles/withStyles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { useCourse, Course } from "../../utils/dao/useCourse";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

import { IconButton, Table, TableBody, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const CourseList = () => {
  const [reloadForm, setReloadForm] = useState(0);
  const { getCourses, deleteCourse } = useCourse();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setSuccessMessage } = useAppContext();
  const [CourseIdToDelete, setCourseIdToDelete] = useState<string | undefined>(undefined);
  const router = useRouter();
  const [courseList, setCourseList] = useState<Course[]>();

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await getCourses();
      setCourseList(result);
    };
    fetchCourses();
  }, [reloadForm]);

  const toogle = (courseId?: string) => {
    setCourseIdToDelete(courseId);
    setIsModalOpen(!isModalOpen);
  };

  const onConfirmDelete = async () => {
    if (CourseIdToDelete) {
      await deleteCourse(CourseIdToDelete)
        .then(() => {
          setSuccessMessage("The course was deleted.");
          toogle(undefined);
          setReloadForm(reloadForm + 1);
        })
        .catch((error) => console.log(error));
    }
  };

  if (courseList && courseList.length > 0) {
    return (
      <TableContainer style={{ width: "80%" }} component={Paper}>
        <Table aria-label="customized table">
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
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.featured ? "Yes" : "No"}</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    aria-label="Edit"
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      router.push(
                        {
                          pathname: "course/[id]",
                          query: { id: row.id },
                        },
                        undefined,
                        { shallow: true }
                      );
                    }}
                    size="large"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="Delete" onClick={() => toogle(row.id)} size="large">
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog open={isModalOpen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Are you sure do you want to delete the course ?"}</DialogTitle>
          <DialogActions>
            <Button onClick={onConfirmDelete}>Accept</Button>
            <Button onClick={() => toogle(undefined)} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
    );
  } else {
    return <div>Loading ...</div>;
  }
};

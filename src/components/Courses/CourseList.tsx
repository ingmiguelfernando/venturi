import { useEffect, useState } from "react";
import { useCourse, Course } from "../../utils/dao/useCourse";
import { useRouter } from "next/router";
import { useAppContext } from "../../context";

import { alpha } from "@mui/material/styles";
import withStyles from "@mui/styles/withStyles";
import makeStyles from "@mui/styles/makeStyles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { Modal, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    // color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    // "&:nth-of-type(odd)": {
    //   backgroundColor: theme.palette.action.hover,
    // },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 400,
    //backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    //padding: theme.spacing(2, 4, 3),
  },
  modalButtonPopOver: {
    margin: "2px",
    width: "30%",
    // backgroundColor: alpha(theme.palette.common.black, 0.15),
    // "&:hover": {
    //   backgroundColor: alpha(theme.palette.common.black, 0.35),
    // },
  },
  cancelButtonSection: {
    paddingTop: "10px",
    display: "flex",
    justifyContent: "center",
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
  const classes = useStyles();

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
                          pathname: "/course",
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
        <Modal open={isModalOpen} className={classes.modal}>
          <div className={classes.paper}>
            <p>Are you sure do you want to delete the course ?</p>
            <div className={classes.cancelButtonSection}>
              <Button color="secondary" classes={{ root: classes.modalButtonPopOver }} onClick={onConfirmDelete}>
                Accept
              </Button>
              <Button color="secondary" classes={{ root: classes.modalButtonPopOver }} onClick={() => toogle(undefined)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </TableContainer>
    );
  } else {
    return <div>Loading ...</div>;
  }
};

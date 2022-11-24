import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useGetFaqQuery} from "../../store/reqres/reqres.api";

const Faq = () => {
  const {data: faq = []} = useGetFaqQuery();

  return (
    <Box m="20px">
      <h1>Frequently Asked Questions Page</h1>

      {faq.map(item =>
        <Accordion defaultExpanded key={item.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">
              {item.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {item.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
};

export default Faq;
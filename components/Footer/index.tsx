import classes from "./styles.module.css";
import {Center, Group} from "@mantine/core";

export default function Footer() {
    return (
        <div className={classes.footer}>
            <div className={classes.inner}>
                <Center>
                    <Group className={classes.links} display={"block"}>VUQuantum2024 &nbsp; Gabrielius Keibas, &nbsp;
                        Marco Marcozzi, &nbsp;
                        Pijus Petkevičius</Group>
                </Center>
            </div>
        </div>
    );
}

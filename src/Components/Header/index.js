import { Icon } from "@iconify/react/dist/iconify";
import { Grid } from "@mui/material"
import { useEffect, useState } from "react";
import { Container, ItemsMenu } from "./styles";

const Header = () => {

    const [userAdmin, setUserAdmin] = useState();

    useEffect(()=>{
        setUserAdmin(false)
    },[])

    return (
        <Container container>
            <Grid item xs={12}>
                <Grid container >
                    <Grid item xs={2} style={{padding: "0 3.5%"}}>
                        <Grid container justifyContent="center">
                            <Grid item={2} style={{ marginTop: "8.5%", marginRight: "60%" }}>
                                <Icon 
                                    icon="pepicons:house"
                                    fontSize={35}
                                    color="white"
                                    cursor="pointer"
                                />
                            </Grid>

                        </Grid>
                        
                    </Grid>

                    <Grid item xs={8}>
                        <Grid container>
                            <Grid item xs={2} style={{display:"flex", justifyContent:"center", marginTop: "-0.4%"}}>
                                <ItemsMenu>Eventos</ItemsMenu>
                            </Grid>
                            <Grid item xs={3} style={{display:"flex", justifyContent:"center", marginTop: "-0.4%"}}>
                                <ItemsMenu>Gerenciar Eventos</ItemsMenu>
                            </Grid>
                            { userAdmin &&
                                <Grid item xs={3} style={{display:"flex", justifyContent:"center", marginTop: "-0.4%"}}>
                                    <ItemsMenu>Gerenciar Evento</ItemsMenu>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                    


                    <Grid item xs={2} style={{padding: "0 3.5%"}}>
                        <Grid container justifyContent="center">
                            <Grid item={2} style={{ marginTop: "8.5%", marginLeft: "60%" }}>
                                <Icon 
                                    icon="heroicons:arrow-right-on-rectangle-20-solid"
                                    fontSize={35}
                                    color="white"
                                    cursor="pointer"
                                />
                            </Grid>

                        </Grid>
                        
                    </Grid>

                </Grid>    
            </Grid>
        </Container>
    )
}

export default Header;

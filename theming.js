import { Colors, Typography, Assets } from 'react-native-ui-lib';

export const configTheme = () => {
    Colors.loadColors({
        primary:"#537188",
        secondary:"#CBB279",
        tertiary:"#E1D4BB",
        background:"#FFFFFF"
    })

    Typography.loadTypographies({
        bigLabel : {
            fontSize: 18,
            fontWeight:"bold",
            color: Colors.background
        },
        mediumLabel : {
            fontSize: 16,
            fontWeight:"bold",
            color: Colors.background
        },
        smallLabel:{
            fontSize: 14,
            fontWeight:"bold",
            color: Colors.background
        },
        header : {
            fontSize: 24,
            fontWeight:"bold"
        }
    });

};
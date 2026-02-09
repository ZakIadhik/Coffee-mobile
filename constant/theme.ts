export const layoutTheme = {

    colors: {
        primary: {
            100: "#E6E9EE", // very light tint of #192438
            300: "#9FA8B8",
            500: "#192438", // MAIN PRIMARY
            700: "#11192A",
            900: "#0A0F1A",
        },

        secondary: {
            100: "#F3E6D9", // very light tint of #854C1F
            300: "#C9986D",
            500: "#854C1F", // MAIN SECONDARY
            700: "#5E3415",
            900: "#3D220E",
        },

        neutral: {
            light: "#d9d9d9", // light gray
            medium: "#988080",
            dark: "#838383",
            darker: "#4F4F4F",
            darkest: "#1A1A1A",
            white: "#FFFFFF",
            black: "#000000",
        },

        accent: {
            100: "#E3F0F3",
            300: "#B7D3DD",
            500: "#95BCCC", // MAIN ACCENT
            700: "#6E9BA8",
            900: "#4D7682",
        },

        background: {
            primary: "#FFFFFF",
            secondary: "#F5F5F5",
            black: "#000000",
            white: "#FFFFFF",
            soft: "#F0ECEC", // using pastel tone (#988080 → soft tint)
            dark: "#1A1A1A",
            light: "#FFFFFF",
            gray: "#a6a5a2",
            darkBlue: "#1B2332",
        },

        gradients: {
            primary: ["#192438", "#313130"],
            secondary: ["#854C1F", "#5E3415"],
            accent: ["#95BCCC", "#6E9BA8"],
            background: ["#FFFFFF", "#F5F5F5"],
            text: ["#000000", "#4F4F4F"],
            button: ["#854C1F", "#5E3415"],
        },

        text: {
            primary: "#000000",
            secondary: "#4F4F4F",
            muted: "#838383",
            tertiary: "#F6F6F6",
            inverse: "#FFFFFF",
            highlight: "#C64949",
            link: "#FCC21B",
            error: "#C64949",
        },

        button: {
            primary: {
                bg: "#854C1F", // using secondary.500
                bgHover: "#5E3415", // using secondary.700
                text: "#FFFFFF",
            },
            secondary: {
                bg: "#192438", // using primary.500
                bgHover: "#11192A", // using primary.700
                text: "#FFFFFF",
            },
            accent: {
                bg: "#95BCCC", // using accent.500
                bgHover: "#6E9BA8", // using accent.700
                text: "#FFFFFF",
            },
        },
    },

    fonts: {
        sora: {
            bold: "Sora-Bold",
            extraBold: "Sora-ExtraBold",
            extraLight: "Sora-ExtraLight",
            light: "Sora-Light",
            medium: "Sora-Medium",
            regular: "Sora-Regular",
            semiBold: "Sora-SemiBold",
            thin: "Sora-Thin",
            variableFont_wght: "Sora-VariableFont_wght",
        }
    },
};

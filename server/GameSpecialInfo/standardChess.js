function addSpecialInfo(){
    const specialInfo = {};

    specialInfo.kingLocations = {
        white: ["E", 1],
        black: ["E", 8]
    };

    specialInfo.isChecked = {
        white: false,
        black: false
    };

    specialInfo.enPassantAvailable = false;

    specialInfo.castlingLegal = {
        A1: true,
        E1: true,
        H1: true,
        A8: true,
        E8: true,
        H8: true
    }

    return specialInfo;
}

module.exports = addSpecialInfo;
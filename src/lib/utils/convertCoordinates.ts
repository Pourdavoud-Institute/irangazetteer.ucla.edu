/** Convert geographic coordinates from decimal degrees (DD) format to degrees/minutes/seconds (DMS) format.
 * @param value A longitude or latitude value in decimal degrees number format, i.e. `30.20347222`
 * @param type Coordinate type
 * @returns DMS formatted coordinate string, i.e. `"30°12′12.5″ N"`
 */
export const convertCoordinates = (
    value: number,
    type: 'lon' | 'lat',
): string => {
    let str = `${value}`;
    if (Number.isNaN(value)) {
        return str;
    }

    // degrees - get whole number
    const degrees = Math.floor(Math.abs(value));
    str = `${degrees}°`;

    // minutes & seconds
    // get all decimals
    const res = Math.abs(value % 1) * 60;
    const minutes = `${Math.floor(res)}′`;
    // lock seconds to 2 dec places
    const seconds = `${new Intl.NumberFormat('en-US', {
        style: 'decimal',
        maximumFractionDigits: 2,
    }).format((res % 1) * 60)}″`;

    str += minutes + seconds;

    let direction;
    if (type === 'lat') {
        direction = value >= 0 ? ' N' : ' S';
    } else {
        direction = value >= 0 ? ' E' : ' W';
    }
    str += direction;

    return str;
};

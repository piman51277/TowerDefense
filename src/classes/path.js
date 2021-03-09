class Path {
    /**
     * Path object constructor. Precomputes several interval values on call.
     * @param {array} pointArray - An array of x-y point pairs
     */
    constructor(pointArray) {
        this.pointArray = pointArray;

        //get total length
        let segmentLengths = [];
        let runningTotals = [0]; //precompute to trade RAM for processing speed later on
        let total = 0;
        let j = 0;
        for (let i = 1; i < pointArray.length; j = i++) {
            const [x1, y1] = pointArray[j]
            const [x2, y2] = pointArray[i]

            //find distance
            const b0 = x1 - x2;
            const b1 = y1 - y2;

            //pythagorean
            const length = Math.sqrt(b0 ** 2 + b1 ** 2)

            //add to array
            segmentLengths.push(length)

            //add to total
            total += length;

            //running total
            runningTotals.push(total)
        }

        //saves as properties
        this.segmentLengths = segmentLengths;
        this.totalLength = total;
        this.runningLength = runningTotals;

        //precomputes progress percents
        let runningPercentTotals = [];
        for (let i in runningTotals) {
            runningPercentTotals.push(runningTotals[i] / total)
        }
        this.percentLength = runningPercentTotals;

    }

    /**
     * Gives coordinates based on progress
     * @param {float} percentProgress - a float between 0 and 1 representing path progress
     * @return {array} - returns x,y pair representing point on path
     */
    getPosFromPercent(percentProgress) {
        //check if progress is within bounds
        if (percentProgress < 0) throw "percentProgress must be above 0"

        //check if progress is 100% or 0%
        if (percentProgress == 0) {
            //its 0%, give first pair
            return this.pointArray[0]
        } else if (percentProgress >= 1) {
            // its 100% or above, give last pair
            return this.pointArray[this.pointArray.length - 1]
        }
        //determine if we should start linear search from start or end
        let lowerBound; //point BEFORE the progress
        let upperBound; //point AFTER the progress
        if (percentProgress >= 0.5) {
            //progress is over 50%, start from end
            for (let i = this.runningpercent.percent - 1; i >= 0; i--) {
                if (percentProgress >= this.runningpercent[i]) {
                    upperBound = i + 2;
                    lowerBound = i + 1;
                    break;
                }
            }
        } else {
            //start from start
            for (let i = 0; i < this.runningpercent.percent; i++) {
                if (percentProgress <= this.runningpercent[i]) {
                    upperBound = i + 1;
                    lowerBound = i;
                    break;
                }
            }
        }

        //compute postion relative to lower/upperBound
        const fromLower = (percentProgress - (this.runningpercent[lowerBound - 1] || 0))
        const segmentpercent = this.segmentpercents[lowerBound - 1]
        const inversePos = fromLower / segmentpercent
        const relativePos = 1 - (inversePos)

        //compute coords using real coords of lower and upper bounds
        const lowerCoords = this.pointArray[lowerBound - 1]
        const upperCoords = this.pointArray[upperBound - 1]
        const x = relativePos * lowerCoords[0] + inversePos * upperCoords[0]
        const y = relativePos * lowerCoords[1] + inversePos * upperCoords[1]
        return [x, y]

    }

    /**
     * Gives coordinates based on length traveled
     * @param {*} lengthProgress - number representing the progress on the track on length.
     * @return {array} - returns x,y pair representing point on path 
     */
    getPosFromLength(lengthProgress) {
        //check if progress is within bounds
        if (lengthProgress < 0) throw "lengthProgress has to be positive"

        //check if progress is 100% or 0%
        if (lengthProgress == 0) {
            //its 0%, give first pair
            return this.pointArray[0]
        } else if (lengthProgress >= this.totalLength) {
            // its 100% or more, give last pair
            return this.pointArray[this.pointArray.length - 1]
        }


        //determine if we should start linear search from start or end
        let lowerBound; //point BEFORE the progress
        let upperBound; //point AFTER the progress
        if (lengthProgress >= (0.5 * this.totalLength)) {
            //progress is over 50%, start from end
            for (let i = this.runningLength.length - 1; i >= 0; i--) {
                if (lengthProgress >= this.runningLength[i]) {
                    upperBound = i + 2;
                    lowerBound = i + 1;
                    break;
                }
            }
        } else {
            //start from start
            for (let i = 0; i < this.runningLength.length; i++) {
                if (lengthProgress <= this.runningLength[i]) {
                    upperBound = i + 1;
                    lowerBound = i;
                    break;
                }
            }
        }

        //compute postion relative to lower/upperBound
        const fromLower = (lengthProgress - (this.runningLength[lowerBound - 1] || 0))
        const segmentLength = this.segmentLengths[lowerBound - 1]
        const inversePos = fromLower / segmentLength
        const relativePos = 1 - (inversePos)

        //compute coords using real coords of lower and upper bounds
        const lowerCoords = this.pointArray[lowerBound - 1]
        const upperCoords = this.pointArray[upperBound - 1]
        const x = relativePos * lowerCoords[0] + inversePos * upperCoords[0]
        const y = relativePos * lowerCoords[1] + inversePos * upperCoords[1]
        return [x, y]
    }

    /**
     * Finds segments of track in range of point
     * @param {float} x - x-coordinate of center of range circle 
     * @param {float} y - y-coordinate of center of range circle
     * @param {float} radius - radius of range circle
     * @returns {array} - segments of track in range
     */
    getIntervalsForRange(x, y, radius) {
        //max x and y for outside circle
        const maxX = x + radius;
        const minX = x - radius;
        const maxY = y + radius;
        const minY = y - radius;

        //max x and y inside circle
        const diff = radius * 0.7071067812

        const maxInsideX = x + diff;
        const minInsideX = x - diff;
        const maxInsideY = y + diff;
        const minInsideY = y - diff;

        //check the path in intervals of 10
        let rangeMinTmp = 0;
        let rangeMaxTmp = 0;
        let isChecking = false;
        let ranges = [];

        for (let prog = 0; prog < this.totalLength; prog++) {
            //compute coords
            const coords = this.getPosFromLength(prog);
            const [x1, y1] = coords

            //check if outside bounding box
            if (x1 > minX && x1 < maxX && y1 > minY && y1 < maxY) {
                //inside bounding box

                //inside internal circle bounding box
                if (x1 < maxInsideX && x1 > minInsideX && y1 < maxInsideY && y1 > minInsideY) {
                    //inside circle

                    if (isChecking == true) {
                        rangeMaxTmp = prog;
                    } else {
                        isChecking = true;
                        rangeMinTmp = prog;
                    }

                }

                //pythagoreas
                const b1 = x1 - x;
                const b2 = y1 - y;
                const length = Math.sqrt(b1 * b1 + b2 * b2)

                //check if within circle
                if (length <= radius) {
                    //inside circle
                    if (isChecking == true) {
                        rangeMaxTmp = prog;
                    } else {
                        isChecking = true;
                        rangeMinTmp = prog;
                    }
                } else {
                    //outside circle
                    if (isChecking == true) {
                        ranges.push([rangeMinTmp, prog])
                        isChecking = false;
                    }
                }

            } else {
                //outside circle
                if (isChecking == true) {
                    ranges.push([rangeMinTmp, prog])
                    isChecking = false;
                }
            }

        }
        return ranges;
    }
}
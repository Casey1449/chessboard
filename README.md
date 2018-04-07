# Knight and Bishop Chess

###### Here's what it looks like:

<img src="http://g.recordit.co/msV9P0azpg.gif" width="486" height="435" />

## To run

(These instructions assume you have some relatively recent version of `node`, and either `npm` and/or `yarn` installed globally on your machine.)

1.  Clone this repo:
    `git clone https://github.com/Casey1449/chessboard.git`

2.  Go into the repo's root:
    `cd chessboard`

3.  Install the dependencies:
    `yarn` or `npm install`

4.  Start the local dev server:
    `yarn run start` or `npm run start`
    (make sure you don't have anything already running on port 3000)

5.  Point your browser to: http://localhost:3000/

## Notes and TODOs

* The drag-and-drop interface won't work on a touchscreen device, because the helper library (react-dnd) is based built on the browser's native drag-and-drop API, which doesn't support touch.

  * Potential Solve #1: Import the 'touch backend' for react-dnd, and then do some browser/device sniffing to decide which backend to use. Image previews would break and have to be re-worked.
  * Potential Solve #2: Create a parallel click/tap based interface, where pieces can either be dragged _or_ tapped (selected), and dropped via a second tap on the target square.

* The logic around 'blocked' square (i.e. the squares in the Bishop's legal 'path' that are on the leeward side of the knight) relies on the assumption that there are only two pieces. This is not scalable and needs reworking.

* Obviously needs tests.

- Would be nice to implement 'turns', requiring alternation between knight abd bishop moves.

* Would be nice to implement a 'move log' in a sidebar that logs the moves in proper chess notation, and a proper number/letter grid on the axes of the board.

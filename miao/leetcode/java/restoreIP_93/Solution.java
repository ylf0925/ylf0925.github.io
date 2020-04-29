package restoreIP_93;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

class Solution {

    int endPos;
    String str;
    LinkedList<String> stack = new LinkedList<>();
    ArrayList<String> res = new ArrayList<>();

    public List<String> restoreIpAddresses(String s) {
        if (s.length() > 12) {
            return res;
        }
        endPos = s.length() - 1;
        str = s;
        btRunner(0, 3);
        return res;
    }

    public void updateRes(String theRest) {
        stack.add(theRest);
        res.add(String.join(".", stack));
        stack.removeLast();
    }

    public boolean isValid(String s) {
        int l = s.length();
        if (l > 3) {
            return false;
        }
        return (s.charAt(0) == '0') ? (l == 1) : (Integer.parseInt(s) <= 255);
    }

    public void btRunner(int startPos, int dotsNum) {

        if (dotsNum == 0) {
            String rest = str.substring(startPos);
            if (isValid(rest)) {
                updateRes(rest);
            }
            return;
        }

        int movPos = startPos + 1;
        int stopMovePos = Math.min(endPos, startPos + 3);
        for (; movPos <= stopMovePos; movPos += 1) {
            String segment = str.substring(startPos, movPos);
            if (isValid(segment)) {
                stack.add(segment);
                dotsNum -= 1;
                btRunner(movPos, dotsNum);
                stack.removeLast();
                dotsNum += 1;
            }
        }
    }

}
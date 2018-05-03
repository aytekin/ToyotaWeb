package com.toyota.security;

import java.math.BigInteger;
import java.security.*;
import java.security.NoSuchAlgorithmException;

public class GetHash {

    public GetHash() {
    }

    public String HashToPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(password.getBytes(),0,password.length());
        return new BigInteger(1,md.digest()).toString(16);
    }

}


package com.TradeSpot.entities;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;

public enum Role {

    USER, ADMIN;

    public List<GrantedAuthority> getAuthorities(){
        List<GrantedAuthority> lst=new ArrayList<>();
        lst.add(new SimpleGrantedAuthority("ROLE_"+this.name()));
        return lst;
    }
}

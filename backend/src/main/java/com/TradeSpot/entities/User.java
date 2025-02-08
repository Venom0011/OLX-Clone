
package com.TradeSpot.entities;

import jakarta.persistence.*;


import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


@Entity
@Table(name = "Users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User extends BaseEntity implements UserDetails {


    private static final Logger logger= LoggerFactory.getLogger(User.class);

    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String address;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "buyer",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<BroughtItems> broughtItemsList=new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<Product> products = new ArrayList<>();



//	Implementation for UserDetails

    @Override
    public Collection<? extends SimpleGrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> lst= List.of(new SimpleGrantedAuthority("ROLE_"+role.name()));
        logger.info("Authorities {} {}",lst,role.name());
        return lst;
    }



    @Override
    public String getUsername() {
        // TODO Auto-generated method stub
        return email;
    }



    @Override
    public boolean isAccountNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }



    @Override
    public boolean isAccountNonLocked() {
        // TODO Auto-generated method stub
        return true;
    }



    @Override
    public boolean isCredentialsNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }



    @Override
    public boolean isEnabled() {
        // TODO Auto-generated method stub
        return true;
    }
}
